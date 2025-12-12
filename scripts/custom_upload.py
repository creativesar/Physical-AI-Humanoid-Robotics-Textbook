from huggingface_hub import HfApi
import os

print("Starting upload process...")
api = HfApi()

repo_id = "creativesar/Physical_AI_Humanoid_Robotics_Textbook"
folder_path = "."
local_dir = os.path.abspath(folder_path)

print(f"Uploading {local_dir} to {repo_id}...")

try:
    api.upload_folder(
        folder_path=local_dir,
        repo_id=repo_id,
        repo_type="dataset",
        ignore_patterns=[
            "**/node_modules/**", 
            "**/.cache/**", 
            "**/.git/**", 
            "**/.venv/**", 
            "**/__pycache__/**",
            "**/*.pyc",
            "dist/**",
            "build/**",
            ".next/**"
        ],
        path_in_repo="."
    )
    print("Upload completed successfully!")
except Exception as e:
    print(f"Upload failed: {e}")
    exit(1)
