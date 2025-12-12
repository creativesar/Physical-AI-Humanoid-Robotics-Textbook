from huggingface_hub import HfApi
import os

print("Starting Space deployment process...")
api = HfApi()

# Organization and Space name
# Using the same naming convention as the model/dataset for consistency
# If this fails, we might need to check if the Space needs to be created first or if the name is different
repo_id = "creativesar/Physical_AI_Humanoid_Robotics_Textbook" 
backend_path = "backend"
local_dir = os.path.abspath(backend_path)

print(f"Deploying {local_dir} to {repo_id} (Space)...")

try:
    # Ensure the repo exists as a Space, create if not
    api.create_repo(
        repo_id=repo_id,
        repo_type="space",
        space_sdk="docker",
        exist_ok=True
    )
    print(f"Ensured Space exists at https://huggingface.co/spaces/{repo_id}")

    # Upload the backend folder contents to the root of the Space
    api.upload_folder(
        folder_path=local_dir,
        repo_id=repo_id,
        repo_type="space",
        ignore_patterns=[
            "__pycache__",
            "*.pyc",
            ".env",
            ".env.*",
            ".git",
            ".mypy_cache",
            ".pytest_cache",
            "venv",
            ".venv"
        ],
        path_in_repo="."
    )
    print("Deployment upload completed successfully!")
    print(f"Your Space should be building at: https://huggingface.co/spaces/{repo_id}")
    
except Exception as e:
    print(f"Deployment failed: {e}")
    exit(1)
