from qdrant_client import QdrantClient
import logging

# Enable logging to see potential issues
logging.basicConfig(level=logging.DEBUG)

print('Starting Qdrant connection test...')

try:
    print('Creating Qdrant client...')
    qdrant_client = QdrantClient(
        url='https://fdb6b4bd-eaef-4645-8a17-75e1e5cb2690.eu-central-1-0.aws.cloud.qdrant.io:6333',
        api_key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.fEaFCes1TVNHWP0rcYW64YIrQNWRbQ-j611ARtEMYqE',
    )

    print('Client created, attempting to get collections...')
    collections = qdrant_client.get_collections()
    print(f'Connection successful. Collections: {collections}')

    # If there are collections, print details about each
    if hasattr(collections, 'collections'):
        if collections.collections:
            for collection in collections.collections:
                print(f'Collection: {collection.name}')
        else:
            print('No collections exist in this Qdrant instance.')
    else:
        print('No collections attribute found in response')

    # Let's also get detailed info about each collection
    for collection in collections.collections:
        print(f'Getting detailed info for collection: {collection.name}')
        info = qdrant_client.get_collection(collection.name)
        print(f'  - Status: {info.status}')
        print(f'  - Points count: {info.points_count}')
        print(f'  - Indexed vectors count: {info.indexed_vectors_count}')
        print(f'  - Config: {info.config}')

except Exception as e:
    print(f'Error connecting to Qdrant: {e}')
    import traceback
    traceback.print_exc()