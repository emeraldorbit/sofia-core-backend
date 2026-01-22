import requests
import sys
from datetime import datetime
import json

class AuthSystemTester:
    def __init__(self, base_url="https://uptime-savior.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.session_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    {details}")

    def run_test(self, name, method, endpoint, expected_status, data=None, cookies=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, cookies=cookies)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, cookies=cookies)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, cookies=cookies)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}, Expected: {expected_status}"
            
            if not success:
                try:
                    error_data = response.json()
                    details += f", Response: {error_data}"
                except:
                    details += f", Response: {response.text[:100]}"
            
            self.log_test(name, success, details)
            return success, response

        except Exception as e:
            self.log_test(name, False, f"Error: {str(e)}")
            return False, None

    def test_user_registration(self):
        """Test user registration"""
        test_user = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test_{datetime.now().strftime('%H%M%S')}@test.com",
            "password": "testpass123"
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=test_user
        )
        
        if success and response:
            # Extract session token from cookies
            session_cookie = response.cookies.get('session_token')
            if session_cookie:
                self.session_token = session_cookie
                self.log_test("Session Token Extraction", True, "Got session token from registration")
                return test_user
            else:
                self.log_test("Session Token Extraction", False, "No session token in response")
        
        return None

    def test_user_login(self, email="admin@test.com", password="admin123"):
        """Test user login with existing user"""
        login_data = {"email": email, "password": password}
        
        success, response = self.run_test(
            "User Login",
            "POST", 
            "auth/login",
            200,
            data=login_data
        )
        
        if success and response:
            # Extract session token from cookies
            session_cookie = response.cookies.get('session_token')
            if session_cookie:
                self.session_token = session_cookie
                self.log_test("Login Session Token", True, "Got session token from login")
                return True
            else:
                self.log_test("Login Session Token", False, "No session token in login response")
        
        return False

    def test_get_current_user(self):
        """Test getting current user data"""
        if not self.session_token:
            self.log_test("Get Current User", False, "No session token available")
            return False
            
        cookies = {'session_token': self.session_token}
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "auth/me",
            200,
            cookies=cookies
        )
        return success

    def test_admin_stats(self):
        """Test admin stats endpoint"""
        if not self.session_token:
            self.log_test("Admin Stats", False, "No session token available")
            return False
            
        cookies = {'session_token': self.session_token}
        success, response = self.run_test(
            "Admin Stats",
            "GET",
            "admin/stats",
            200,
            cookies=cookies
        )
        
        if success and response:
            try:
                stats = response.json()
                required_fields = ['total_users', 'active_sessions', 'google_users', 'email_users']
                missing_fields = [field for field in required_fields if field not in stats]
                
                if missing_fields:
                    self.log_test("Stats Fields Validation", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_test("Stats Fields Validation", True, f"All required fields present: {stats}")
            except Exception as e:
                self.log_test("Stats Response Parsing", False, f"Failed to parse response: {e}")
        
        return success

    def test_admin_users(self):
        """Test admin users endpoint"""
        if not self.session_token:
            self.log_test("Admin Users", False, "No session token available")
            return False
            
        cookies = {'session_token': self.session_token}
        success, response = self.run_test(
            "Admin Users List",
            "GET",
            "admin/users",
            200,
            cookies=cookies
        )
        return success

    def test_logout(self):
        """Test logout functionality"""
        if not self.session_token:
            self.log_test("Logout", False, "No session token available")
            return False
            
        cookies = {'session_token': self.session_token}
        success, response = self.run_test(
            "Logout",
            "POST",
            "auth/logout",
            200,
            cookies=cookies
        )
        
        if success:
            self.session_token = None
            
        return success

    def test_invalid_credentials(self):
        """Test login with invalid credentials"""
        invalid_data = {"email": "invalid@test.com", "password": "wrongpass"}
        
        success, response = self.run_test(
            "Invalid Credentials",
            "POST",
            "auth/login", 
            401,
            data=invalid_data
        )
        return success

    def test_duplicate_registration(self):
        """Test registration with existing email"""
        duplicate_data = {
            "name": "Duplicate User",
            "email": "admin@test.com",  # Using existing admin email
            "password": "testpass123"
        }
        
        success, response = self.run_test(
            "Duplicate Email Registration",
            "POST",
            "auth/register",
            400,
            data=duplicate_data
        )
        return success

    def run_all_tests(self):
        """Run complete test suite"""
        print("🚀 Starting Auth System Backend Tests")
        print(f"📡 Testing against: {self.base_url}")
        print("=" * 60)

        # Test user registration
        new_user = self.test_user_registration()
        
        # Test login with admin user
        self.test_user_login()
        
        # Test authenticated endpoints
        self.test_get_current_user()
        self.test_admin_stats()
        self.test_admin_users()
        
        # Test logout
        self.test_logout()
        
        # Test error cases
        self.test_invalid_credentials()
        self.test_duplicate_registration()

        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed")
            failed_tests = [r for r in self.test_results if not r['success']]
            print("\nFailed Tests:")
            for test in failed_tests:
                print(f"  - {test['test']}: {test['details']}")
            return 1

def main():
    tester = AuthSystemTester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())