#!/usr/bin/env python3
"""
Helper script for deploying the backend to Hugging Face Spaces
"""

import os
import subprocess
import sys
from pathlib import Path

def check_prerequisites():
    """Check if all prerequisites are met"""
    print("Checking prerequisites...")
    
    # Check if huggingface_hub is installed
    try:
        import huggingface_hub
    except ImportError:
        print("Installing huggingface_hub...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "huggingface_hub"])
    
    # Check if git is installed
    try:
        subprocess.check_output(["git", "--version"])
    except FileNotFoundError:
        print("Error: Git is not installed. Please install Git first.")
        return False
    
    return True

def create_space_repo(space_name, organization="creativesar"):
    """Create a new Space repository on Hugging Face"""
    try:
        from huggingface_hub import HfApi
        api = HfApi()
        
        # Create the Space
        repo_url = api.create_repo(
            repo_id=f"{organization}/{space_name}",
            repo_type="space",
            space_sdk="docker"
        )
        
        print(f"Successfully created Space: {repo_url}")
        return repo_url
    except Exception as e:
        print(f"Error creating Space: {e}")
        return None

def deploy_to_space(space_name, organization="creativesar"):
    """Deploy the backend to an existing Hugging Face Space"""
    try:
        # Get the current directory
        backend_dir = Path(__file__).parent.absolute()
        
        # Change to backend directory
        os.chdir(backend_dir)
        
        # Initialize git repo if not already done
        if not os.path.exists(".git"):
            subprocess.check_call(["git", "init"])
            subprocess.check_call(["git", "remote", "add", "origin", f"https://huggingface.co/spaces/{organization}/{space_name}"])
        
        # Add all files
        subprocess.check_call(["git", "add", "."])
        
        # Commit changes
        subprocess.check_call(["git", "commit", "-m", "Deploy backend to Hugging Face Spaces"])
        
        # Push to Hugging Face
        subprocess.check_call(["git", "push", "origin", "main"])
        
        print(f"Successfully deployed to Space: https://huggingface.co/spaces/{organization}/{space_name}")
        return True
    except Exception as e:
        print(f"Error deploying to Space: {e}")
        return False

def main():
    """Main deployment function"""
    if not check_prerequisites():
        return
    
    print("Physical AI & Humanoid Robotics Textbook Backend Deployment Tool")
    print("=" * 60)
    
    # Get space name
    space_name = input("Enter the name for your Hugging Face Space: ").strip()
    if not space_name:
        print("Space name is required!")
        return
    
    # Get organization (default to creativesar)
    organization = input("Enter your Hugging Face organization (default: creativesar): ").strip()
    if not organization:
        organization = "creativesar"
    
    # Ask if creating new space or deploying to existing
    choice = input("Create new Space (1) or deploy to existing Space (2)? [1/2]: ").strip()
    
    if choice == "1":
        print(f"Creating new Space '{space_name}' in organization '{organization}'...")
        repo_url = create_space_repo(space_name, organization)
        if repo_url:
            print("Now you need to:")
            print("1. Set environment variables in the Space settings")
            print("2. Run this script again and choose option 2 to deploy files")
    elif choice == "2":
        print(f"Deploying to existing Space '{space_name}' in organization '{organization}'...")
        success = deploy_to_space(space_name, organization)
        if success:
            print("Deployment completed successfully!")
            print("Remember to set your environment variables in the Space settings.")
        else:
            print("Deployment failed. Please check the error messages above.")
    else:
        print("Invalid choice. Please run the script again.")

if __name__ == "__main__":
    main()