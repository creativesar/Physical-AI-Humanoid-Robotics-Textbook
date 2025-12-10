import re
import hashlib
from typing import List, Dict, Any
import tiktoken

def chunk_mdx_content(content: str, module_id: str, source_path: str) -> List[Dict[str, Any]]:
    """
    Chunk MDX content for ingestion into the RAG system following the implementation guide.
    """
    # Remove MDX frontmatter from content
    content = remove_frontmatter(content)

    # Remove code blocks temporarily, we'll add them back later as needed
    code_blocks = extract_code_blocks(content)
    content = remove_code_blocks(content)

    # Split content by headings while preserving context
    sections = split_by_headings(content)

    chunks = []
    for section in sections:
        section_chunks = chunk_section(section, module_id, source_path)
        chunks.extend(section_chunks)

    return chunks

def remove_frontmatter(content: str) -> str:
    """
    Remove YAML frontmatter from MDX content.
    """
    # Pattern to match YAML frontmatter between --- delimiters
    pattern = r'^---\n.*?\n---\n'
    return re.sub(pattern, '', content, flags=re.DOTALL)

def extract_code_blocks(content: str) -> List[str]:
    """
    Extract code blocks from MDX content.
    """
    pattern = r'```.*?\n.*?\n```'
    code_blocks = re.findall(pattern, content, flags=re.DOTALL)
    return code_blocks

def remove_code_blocks(content: str) -> str:
    """
    Remove code blocks from MDX content.
    """
    pattern = r'```.*?\n.*?\n```'
    return re.sub(pattern, '', content, flags=re.DOTALL)

def split_by_headings(content: str) -> List[str]:
    """
    Split content by headings while preserving heading context.
    """
    # Split content by headings (h1, h2, h3, h4)
    headings = re.split(r'\n(#+\s.*?\n)', content)

    sections = []
    for i in range(1, len(headings), 2):  # Process heading + content pairs
        heading = headings[i].strip() if i < len(headings) else ""
        section_content = headings[i+1].strip() if i+1 < len(headings) else ""

        # Combine heading with its content
        if heading and section_content:
            sections.append(f"{heading}\n{section_content}")
        elif heading:  # If there's only a heading with no following content
            sections.append(heading)

    # If the first element wasn't a heading (e.g., introductory text), add it
    if headings and not headings[0].strip() == "" and len(headings) > 0 and not re.match(r'^#+\s', headings[0]):
        sections.insert(0, headings[0].strip())

    return sections

def chunk_section(section: str, module_id: str, source_path: str) -> List[Dict[str, Any]]:
    """
    Break down large sections into smaller chunks based on token limits.
    """
    # Initialize tokenizer
    tokenizer = tiktoken.encoding_for_model("gpt-3.5-turbo")

    # Maximum tokens per chunk (leaving room for context)
    max_tokens = 500

    chunks = []
    lines = section.split('\n')

    current_chunk = ""
    current_heading = extract_heading(section) or f"Module {module_id}"

    for line in lines:
        # Add line to current chunk
        test_chunk = current_chunk + "\n" + line if current_chunk else line

        # Calculate tokens
        token_count = len(tokenizer.encode(test_chunk))

        if token_count <= max_tokens:
            # Keep adding to current chunk
            current_chunk = test_chunk
        else:
            # Current chunk is full, save it
            if current_chunk.strip():
                chunks.append({
                    'text': current_chunk.strip(),
                    'module_id': module_id,
                    'source_path': source_path,
                    'section': current_heading,
                    'module_title': f"Module {module_id.replace('-', ' ').title()}",
                    'token_count': len(tokenizer.encode(current_chunk))
                })

            # Start new chunk with this line
            current_chunk = line

    # Add the final chunk if it has content
    if current_chunk.strip():
        chunks.append({
            'text': current_chunk.strip(),
            'module_id': module_id,
            'source_path': source_path,
            'section': current_heading,
            'module_title': f"Module {module_id.replace('-', ' ').title()}",
            'token_count': len(tokenizer.encode(current_chunk))
        })

    return chunks

def extract_heading(text: str) -> str:
    """
    Extract the main heading from a text section.
    """
    # Find the first heading in the text (h1, h2, h3, h4)
    heading_match = re.search(r'^(#+)\s+(.*)', text, re.MULTILINE)
    if heading_match:
        return heading_match.group(2).strip()
    return ""

def chunk_text_by_headings(text: str, max_tokens: int = 500) -> List[Dict[str, Any]]:
    """
    Split text into chunks by headings while respecting token limits.
    """
    # Split text by common heading patterns
    heading_pattern = r'^(#+\s+.*)$|^(.+)\n[-=]+\n'
    parts = re.split(heading_pattern, text, flags=re.MULTILINE)

    chunks = []
    current_chunk = ""
    current_heading = "Introduction"

    # Initialize tokenizer
    tokenizer = tiktoken.encoding_for_model("gpt-3.5-turbo")

    for part in parts:
        if part is None:
            continue

        # Check if this part is a heading
        heading_match = re.match(r'^(#+\s+.*)$', part.strip(), re.MULTILINE)
        if heading_match:
            # Save current chunk if it's not empty
            if current_chunk.strip():
                chunks.append({
                    'text': current_chunk.strip(),
                    'heading': current_heading,
                    'token_count': calculate_token_count(current_chunk)
                })

            # Update current heading
            current_heading = heading_match.group(0).strip()
            current_chunk = ""
            continue

        # Check if adding this part exceeds token limit
        test_chunk = current_chunk + "\n" + part
        token_count = calculate_token_count(test_chunk)

        if token_count > max_tokens and current_chunk:
            # Save the current chunk
            chunks.append({
                'text': current_chunk.strip(),
                'heading': current_heading,
                'token_count': calculate_token_count(current_chunk)
            })

            # Start a new chunk
            current_chunk = part
        else:
            current_chunk = test_chunk

    # Add the final chunk if it's not empty
    if current_chunk.strip():
        chunks.append({
            'text': current_chunk.strip(),
            'heading': current_heading,
            'token_count': calculate_token_count(current_chunk)
        })

    return chunks

def generate_content_hash(content: str) -> str:
    """
    Generate a hash for content to detect duplicates.
    """
    return hashlib.md5(content.encode()).hexdigest()

def calculate_token_count(text: str) -> int:
    """
    Calculate the number of tokens in a text.
    """
    tokenizer = tiktoken.encoding_for_model("gpt-3.5-turbo")
    tokens = tokenizer.encode(text)
    return len(tokens)