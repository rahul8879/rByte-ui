"""
Script to fix Twilio authentication issues
"""
import os
import sys
from dotenv import load_dotenv
from twilio.rest import Client
import getpass

def fix_twilio_auth():
    print("Twilio Authentication Fixer")
    print("==========================")
    
    # Check if .env file exists
    env_exists = os.path.exists(".env")
    print(f".env file exists: {env_exists}")
    
    # Load current environment variables
    load_dotenv()
    current_sid = os.getenv("TWILIO_ACCOUNT_SID")
    current_token = os.getenv("TWILIO_AUTH_TOKEN")
    current_phone = os.getenv("TWILIO_PHONE_NUMBER")
    
    print("\nCurrent Twilio configuration:")
    print(f"Account SID: {current_sid[:5]}...{current_sid[-5:] if current_sid else 'NOT SET'}")
    print(f"Auth Token: {'*' * 10 if current_token else 'NOT SET'}")
    print(f"Phone Number: {current_phone or 'NOT SET'}")
    
    # Get new credentials
    print("\nEnter your Twilio credentials (press Enter to keep current value):")
    
    new_sid = input(f"Account SID [{current_sid[:5]}...{current_sid[-5:] if current_sid else ''}]: ")
    if not new_sid:
        new_sid = current_sid
    
    new_token = getpass.getpass(f"Auth Token (hidden): ")
    if not new_token:
        new_token = current_token
    
    new_phone = input(f"Phone Number [{current_phone or ''}]: ")
    if not new_phone:
        new_phone = current_phone
    
    # Test the new credentials
    print("\nTesting new credentials...")
    try:
        client = Client(new_sid, new_token)
        account = client.api.accounts(new_sid).fetch()
        print(f"✅ Successfully connected to Twilio account: {account.friendly_name}")
        print(f"Account status: {account.status}")
        
        # Check if the phone number exists in the account
        try:
            numbers = client.incoming_phone_numbers.list(phone_number=new_phone)
            if numbers:
                print(f"✅ Phone number {new_phone} is valid and belongs to your account")
            else:
                print(f"⚠️ Warning: Phone number {new_phone} was not found in your account")
                print("Available phone numbers in your account:")
                all_numbers = client.incoming_phone_numbers.list()
                for num in all_numbers:
                    print(f"  - {num.phone_number}")
                
                if all_numbers:
                    use_available = input(f"Would you like to use {all_numbers[0].phone_number} instead? (y/n): ")
                    if use_available.lower() == 'y':
                        new_phone = all_numbers[0].phone_number
        except Exception as e:
            print(f"⚠️ Warning: Error checking phone number: {str(e)}")
        
        # Update .env file
        print("\nUpdating .env file...")
        with open(".env", "w") as f:
            f.write(f"TWILIO_ACCOUNT_SID={new_sid}\n")
            f.write(f"TWILIO_AUTH_TOKEN={new_token}\n")
            f.write(f"TWILIO_PHONE_NUMBER={new_phone}\n")
        
        print("✅ .env file updated successfully")
        print("\nPlease restart your FastAPI server for the changes to take effect.")
        return True
    except Exception as e:
        print(f"❌ Error testing credentials: {str(e)}")
        save_anyway = input("Would you like to save these credentials anyway? (y/n): ")
        if save_anyway.lower() == 'y':
            with open(".env", "w") as f:
                f.write(f"TWILIO_ACCOUNT_SID={new_sid}\n")
                f.write(f"TWILIO_AUTH_TOKEN={new_token}\n")
                f.write(f"TWILIO_PHONE_NUMBER={new_phone}\n")
            print("✅ .env file updated successfully")
            print("\nPlease restart your FastAPI server for the changes to take effect.")
            return True
        return False

if __name__ == "__main__":
    success = fix_twilio_auth()
    sys.exit(0 if success else 1)
