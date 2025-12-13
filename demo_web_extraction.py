#!/usr/bin/env python3
"""
Demo script showcasing the usage of requests, xml.etree.ElementTree, and trafilatura packages.

This script demonstrates:
1. Using requests to fetch web content
2. Using trafilatura to extract meaningful content from HTML
3. Using xml.etree.ElementTree to create a structured representation
"""

import requests
import xml.etree.ElementTree as ET
import trafilatura
from datetime import datetime

def fetch_and_extract_web_content(url):
    """
    Fetch content from a URL and extract the main content using trafilatura.
    
    Args:
        url (str): The URL to fetch content from
        
    Returns:
        dict: A dictionary containing extracted information
    """
    try:
        print(f"Fetching content from: {url}")
        
        # Use requests to fetch the content
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        html_content = response.text
        
        # Use trafilatura to extract the main content
        extracted_text = trafilatura.extract(html_content, 
                                           include_comments=False, 
                                           include_tables=True)
        
        # Also get metadata if available
        metadata = trafilatura.extract_metadata(html_content)
        
        return {
            'url': url,
            'title': metadata.title if metadata else 'No title',
            'date': metadata.date if metadata else 'Unknown date',
            'author': metadata.author if metadata else 'Unknown author',
            'content': extracted_text,
            'response_status': response.status_code,
            'content_length': len(html_content)
        }
    except Exception as e:
        print(f"Error fetching content from {url}: {e}")
        return None

def create_xml_report(data):
    """
    Create an XML report using xml.etree.ElementTree.
    
    Args:
        data (dict): Data to include in the XML report
        
    Returns:
        str: XML string representation of the data
    """
    # Create root element
    root = ET.Element("web_extraction_report")
    root.set("generated_on", datetime.now().isoformat())
    
    # Add metadata
    if data:
        url_elem = ET.SubElement(root, "url")
        url_elem.text = data['url']
        
        title_elem = ET.SubElement(root, "title")
        title_elem.text = data['title']
        
        date_elem = ET.SubElement(root, "date")
        date_elem.text = data['date']
        
        author_elem = ET.SubElement(root, "author")
        author_elem.text = data['author']
        
        status_elem = ET.SubElement(root, "status_code")
        status_elem.text = str(data['response_status'])
        
        content_len_elem = ET.SubElement(root, "content_length")
        content_len_elem.text = str(data['content_length'])
        
        content_elem = ET.SubElement(root, "extracted_content")
        content_elem.text = data['content'][:1000] + "..." if data['content'] and len(data['content']) > 1000 else data['content']
    
    # Convert to string
    return ET.tostring(root, encoding='unicode')

def main():
    """
    Main function to demonstrate the integration of all three packages.
    """
    print("Web Content Extraction Demo")
    print("=" * 30)
    
    # Example URL to test with (using a documentation page for reliable content)
    test_url = "https://httpbin.org/html"
    
    # Extract content from the URL
    result = fetch_and_extract_web_content(test_url)
    
    if result:
        print(f"\nSUCCESS: Successfully extracted content:")
        print(f"   Title: {result['title']}")
        print(f"   Status: {result['response_status']}")
        print(f"   Content length: {result['content_length']:,} characters")
        print(f"   Extracted content preview: {result['content'][:100]}..." if result['content'] else "   No content extracted")
        
        # Create an XML report
        xml_result = create_xml_report(result)
        print(f"\nXML Report created ({len(xml_result)} characters):")
        print(xml_result[:500] + "..." if len(xml_result) > 500 else xml_result)
    else:
        print("\nFAILED: Could not extract content")
        
        # Demonstrate the packages individually
        print("\nDemonstrating individual package functionality:")
        
        # requests demonstration
        print("\n1. requests - Making HTTP requests:")
        print("   - requests.get() to fetch web content")
        print("   - requests.post() to submit data")
        print("   - Easy header and parameter management")
        
        # xml.etree.ElementTree demonstration
        print("\n2. xml.etree.ElementTree - Processing XML:")
        xml_example = ET.Element("demo")
        ET.SubElement(xml_example, "item", id="1").text = "First item"
        ET.SubElement(xml_example, "item", id="2").text = "Second item"
        xml_str = ET.tostring(xml_example, encoding='unicode')
        print(f"   - Created XML structure: {xml_str}")
        
        # trafilatura demonstration
        print("\n3. trafilatura - Web content extraction:")
        sample_html = "<html><body><div><h1>Sample Title</h1><p>Sample paragraph</p></div></body></html>"
        extracted = trafilatura.extract(sample_html)
        print(f"   - Extracted content: '{extracted}'")

if __name__ == "__main__":
    main()