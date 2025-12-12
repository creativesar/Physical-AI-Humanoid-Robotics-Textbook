# Uploading Models and Datasets to Hugging Face

This guide explains how to upload models and datasets to Hugging Face using the provided upload script.

## Prerequisites

1. A Hugging Face account
2. Access to the `creativesar` organization on Hugging Face (or your own account)
3. Git installed on your system
4. The model or dataset you want to upload

## Using the Upload Script

The project includes a helper script `upload_to_hf.py` that can upload models and datasets to Hugging Face:

1. Navigate to the project root directory
2. Run the script: `python upload_to_hf.py`
3. Follow the prompts to upload your model, dataset, or both

## Manual Upload Process

If you prefer to upload manually, you can follow these steps:

### Uploading a Model

1. Create a new model repository on Hugging Face:
   - Go to https://huggingface.co/new
   - Select the "creativesar" organization (or your personal account)
   - Enter a model name
   - Choose "MIT" as the license
   - Add appropriate tags
   - Click "Create model"

2. Clone the repository locally:
   ```bash
   git clone https://huggingface.co/creativesar/your-model-name
   cd your-model-name
   ```

3. Add your model files:
   ```bash
   # Copy your model files to the repository directory
   cp /path/to/your/model/files/* .
   ```

4. Commit and push:
   ```bash
   git add .
   git commit -m "Add model files"
   git push
   ```

### Uploading a Dataset

1. Create a new dataset repository on Hugging Face:
   - Go to https://huggingface.co/datasets/new
   - Select the "creativesar" organization (or your personal account)
   - Enter a dataset name
   - Choose "MIT" as the license
   - Add appropriate tags
   - Click "Create dataset"

2. Clone the repository locally:
   ```bash
   git clone https://huggingface.co/datasets/creativesar/your-dataset-name
   cd your-dataset-name
   ```

3. Add your dataset files:
   ```bash
   # Copy your dataset files to the repository directory
   cp /path/to/your/dataset/files/* .
   ```

4. Commit and push:
   ```bash
   git add .
   git commit -m "Add dataset files"
   git push
   ```

## Repository Structure Recommendations

For models, we recommend the following structure:
```
your-model-name/
├── README.md          # Model card
├── config.json        # Model configuration
├── pytorch_model.bin  # Model weights
├── tokenizer.json     # Tokenizer files (if applicable)
└── training_args.json # Training arguments (if applicable)
```

For datasets, we recommend the following structure:
```
your-dataset-name/
├── README.md          # Dataset card
├── dataset_info.json  # Dataset metadata
├── data/
│   ├── train.jsonl    # Training data
│   ├── validation.jsonl # Validation data
│   └── test.jsonl     # Test data
└── dataset_script.py  # Loading script (optional)
```

## Best Practices

1. Always include a comprehensive README.md file with:
   - Model/dataset description
   - Intended uses and limitations
   - Training data information (for models)
   - Evaluation results
   - How to use the model/dataset

2. Use appropriate tags to make your model/dataset discoverable

3. Include a license file

4. For models, include information about:
   - Model architecture
   - Training procedure
   - Evaluated performance
   - Environmental impact (if applicable)

5. For datasets, include information about:
   - Data collection methodology
   - Data preprocessing
   - Dataset statistics
   - Known limitations