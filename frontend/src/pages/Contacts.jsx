import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../App';
import { contactsAPI } from '../api/client';
import { getInitials } from '../utils';
import { 
  ArrowLeft, Search, Plus, Users, Phone, Mail, 
  Building, Edit, Trash2, X, User
} from 'lucide-react';
import { toast } from 'sonner';

export default function Contacts() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    role: ''
  });

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts', user?.email],
    queryFn: () => contactsAPI.list(user?.email).then(r => r.data),
    enabled: !!user?.email,
  });

  const createMutation = useMutation({
    mutationFn: (data) => contactsAPI.create(data, user?.email),
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      setShowModal(false);
      resetForm();
      toast.success('Contact created successfully');
    },
    onError: () => toast.error('Failed to create contact'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => contactsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      setShowModal(false);
      setEditingContact(null);
      resetForm();
      toast.success('Contact updated successfully');
    },
    onError: () => toast.error('Failed to update contact'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => contactsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      toast.success('Contact deleted');
    },
    onError: () => toast.error('Failed to delete contact'),
  });

  const resetForm = () => {
    setFormData({ name: '', phone: '', email: '', company: '', role: '' });
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name || '',
      phone: contact.phone || '',
      email: contact.email || '',
      company: contact.company || '',
      role: contact.role || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContact) {
      updateMutation.mutate({ id: editingContact.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-emerald-400" />
                <span className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Contacts
                </span>
              </div>
            </div>
            <Button 
              onClick={() => { resetForm(); setEditingContact(null); setShowModal(true); }}
              className="bg-emerald-500 hover:bg-emerald-600"
              data-testid="add-contact-btn"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="bg-zinc-900/50 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="pl-12 bg-zinc-800 border-zinc-700"
              data-testid="contact-search"
            />
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No contacts yet</h3>
            <p className="text-zinc-400 mb-6">Add your first contact to get started</p>
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-emerald-500/30 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                        {getInitials(contact.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">{contact.name}</h3>
                        <div className="flex flex-wrap gap-4 mt-1">
                          {contact.email && (
                            <p className="text-sm text-zinc-400 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {contact.email}
                            </p>
                          )}
                          {contact.phone && (
                            <p className="text-sm text-zinc-400 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {contact.phone}
                            </p>
                          )}
                          {contact.company && (
                            <p className="text-sm text-zinc-400 flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {contact.company}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(contact)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm('Delete this contact?')) {
                              deleteMutation.mutate(contact.id);
                            }
                          }}
                          className="text-zinc-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {editingContact ? 'Edit Contact' : 'Add Contact'}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { setShowModal(false); setEditingContact(null); resetForm(); }}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="mt-2 bg-zinc-800 border-zinc-700"
                    required
                    data-testid="contact-name-input"
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="mt-2 bg-zinc-800 border-zinc-700"
                    data-testid="contact-email-input"
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="mt-2 bg-zinc-800 border-zinc-700"
                    data-testid="contact-phone-input"
                  />
                </div>

                <div>
                  <Label>Company</Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Inc."
                    className="mt-2 bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div>
                  <Label>Role</Label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Manager"
                    className="mt-2 bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setShowModal(false); setEditingContact(null); resetForm(); }}
                    className="flex-1 border-zinc-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="contact-submit-btn"
                  >
                    {createMutation.isPending || updateMutation.isPending ? 'Saving...' : editingContact ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
