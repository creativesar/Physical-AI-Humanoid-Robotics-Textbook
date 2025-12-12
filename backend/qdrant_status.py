from qdrant_client import QdrantClient
import logging

# Enable logging to see potential issues
logging.basicConfig(level=logging.INFO)

print('Successfully connected to Qdrant! Here\'s what we found:')

try:
    qdrant_client = QdrantClient(
        url='https://fdb6b4bd-eaef-4645-8a17-75e1e5cb2690.eu-central-1-0.aws.cloud.qdrant.io:6333',
        api_key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.fEaFCes1TVNHWP0rcYW64YIrQNWRbQ-j611ARtEMYqE',
    )

    collections = qdrant_client.get_collections()
    print(f'Available collections: {[collection.name for collection in collections.collections]}')

    # Check if the required collection for our textbook exists
    required_collection = 'textbook_content'
    if any(collection.name == required_collection for collection in collections.collections):
        print(f'\n[SUCCESS] The required collection "{required_collection}" exists!')
        print('This is where the textbook content embeddings will be stored for the RAG system.')
    else:
        print(f'\n[ERROR] The required collection "{required_collection}" does not exist.')
        print('You may need to create it for the textbook RAG system.')

    print(f'\nConnection to Qdrant cloud service successful!')
    print('You can now proceed with ingesting textbook content into the vector database.')

except Exception as e:
    print(f'Error connecting to Qdrant: {e}')