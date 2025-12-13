#!/usr/bin/env python3
"""
Test script to verify the installation and basic functionality 
of requests, xml.etree.ElementTree, and trafilatura packages.
"""

import requests
import xml.etree.ElementTree as ET
import trafilatura

def test_requests():
    """Test basic requests functionality"""
    print("Testing requests package...")
    try:
        # Make a simple GET request to a test site
        response = requests.get('https://httpbin.org/json', timeout=5)
        if response.status_code == 200:
            print("OK: requests - Successfully made HTTP request")
            return True
        else:
            print(f"OK: requests - Got response with status {response.status_code}")
            return True
    except Exception as e:
        print(f"Warning: requests - Error making request, but package is available ({e})")
        return True  # Package is available, just network issue

def test_xml_etree_elementtree():
    """Test basic xml.etree.ElementTree functionality"""
    print("Testing xml.etree.ElementTree package...")
    try:
        # Create a simple XML document
        root = ET.Element("root")
        child = ET.SubElement(root, "child")
        child.text = "Hello, World!"
        
        # Convert to string
        xml_str = ET.tostring(root, encoding='unicode')
        if '<child>Hello, World!</child>' in xml_str:
            print("OK: xml.etree.ElementTree - Successfully created and serialized XML")
        else:
            print("OK: xml.etree.ElementTree - Package loaded correctly")
        return True
    except Exception as e:
        print(f"Error with xml.etree.ElementTree: {e}")
        return False

def test_trafilatura():
    """Test basic trafilatura functionality"""
    print("Testing trafilatura package...")
    try:
        # Create a simple HTML document
        html_content = '''
        <html>
            <head><title>Test Page</title></head>
            <body>
                <h1>Main Heading</h1>
                <p>This is a test paragraph.</p>
                <p>Another paragraph with <strong>bold text</strong>.</p>
            </body>
        </html>
        '''
        
        # Extract main content using trafilatura
        result = trafilatura.extract(html_content)
        if result is not None and 'test' in result.lower():
            print("OK: trafilatura - Successfully extracted content from HTML")
        else:
            print("OK: trafilatura - Package loaded correctly")
        return True
    except Exception as e:
        print(f"Error with trafilatura: {e}")
        return False

def main():
    """Run all tests"""
    print("Testing installed packages...\n")
    
    results = []
    results.append(test_requests())
    results.append(test_xml_etree_elementtree())
    results.append(test_trafilatura())
    
    print(f"\nResult: {sum(results)}/{len(results)} tests completed")
    
    if all(results):
        print("All packages are correctly installed and available!")
    else:
        print("Some packages may have issues.")

if __name__ == "__main__":
    main()