#!/usr/bin/env python3
"""
Helper script for uploading models and datasets to Hugging Face
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

def upload_model(model_path, repo_name, organization="creativesar"):
    """Upload a model to Hugging Face Hub"""
    try:
        from huggingface_hub import HfApi, create_repo
        api = HfApi()
        
        # Create the model repository
        repo_id = f"{organization}/{repo_name}"
        create_repo(repo_id, repo_type="model", exist_ok=True)
        
        # Upload files
        api.upload_folder(
            folder_path=model_path,
            repo_id=repo_id,
            repo_type="model"
        )
        
        print(f"Successfully uploaded model to: https://huggingface.co/{repo_id}")
        return True
    except Exception as e:
        print(f"Error uploading model: {e}")
        return False

def upload_dataset(dataset_path, repo_name, organization="creativesar"):
    """Upload a dataset to Hugging Face Hub"""
    try:
        from huggingface_hub import HfApi, create_repo
        api = HfApi()
        
        # Create the dataset repository
        repo_id = f"{organization}/{repo_name}"
        create_repo(repo_id, repo_type="dataset", exist_ok=True)
        
        # Upload files
        api.upload_folder(
            folder_path=dataset_path,
            repo_id=repo_id,
            repo_type="dataset"
        )
        
        print(f"Successfully uploaded dataset to: https://huggingface.co/datasets/{repo_id}")
        return True
    except Exception as e:
        print(f"Error uploading dataset: {e}")
        return False

def main():
    """Main upload function"""
    if not check_prerequisites():
        return
    
    print("Physical AI & Humanoid Robotics Textbook - Hugging Face Upload Tool")
    print("=" * 70)
    
    # Ask what to upload
    print("What would you like to upload?")
    print("1. Model")
    print("2. Dataset")
    print("3. Both")
    
    choice = input("Enter your choice (1/2/3): ").strip()
    
    organization = input("Enter your Hugging Face organization (default: creativesar): ").strip()
    if not organization:
        organization = "creativesar"
    
    if choice in ["1", "3"]:
        model_path = input("Enter the path to your model directory: ").strip()
        if model_path and os.path.exists(model_path):
            repo_name = input("Enter the name for your model repository: ").strip()
            if repo_name:
                print(f"Uploading model from {model_path} to {organization}/{repo_name}...")
                upload_model(model_path, repo_name, organization)
            else:
                print("Model repository name is required!")
        else:
            print("Invalid model path!")
    
    if choice in ["2", "3"]:
        dataset_path = input("Enter the path to your dataset directory: ").strip()
        if dataset_path and os.path.exists(dataset_path):
            repo_name = input("Enter the name for your dataset repository: ").strip()
            if repo_name:
                print(f"Uploading dataset from {dataset_path} to {organization}/{repo_name}...")
                upload_dataset(dataset_path, repo_name, organization)
            else:
                print("Dataset repository name is required!")
        else:
            print("Invalid dataset path!")

if __name__ == "__main__":
    main()