#!/usr/bin/env python3
"""
Sitemap Processor for Physical AI & Humanoid Robotics Textbook
This script processes a sitemap XML to extract URLs for content ingestion.
"""

import requests
import xml.etree.ElementTree as ET
from typing import List, Dict, Any
import time


class SitemapProcessor:
    """
    A class to process sitemap XML files and extract URLs for content ingestion.
    """
    
    def __init__(self, sitemap_url: str):
        """
        Initialize the SitemapProcessor with the sitemap URL.
        
        Args:
            sitemap_url (str): The URL of the sitemap XML file
        """
        self.sitemap_url = sitemap_url
        self.urls = []
    
    def fetch_sitemap(self) -> str:
        """
        Fetch the sitemap XML content from the provided URL.
        
        Returns:
            str: The content of the sitemap XML file
        """
        response = requests.get(self.sitemap_url)
        response.raise_for_status()
        return response.text
    
    def parse_sitemap(self, sitemap_content: str) -> List[str]:
        """
        Parse the sitemap XML content and extract URLs.
        
        Args:
            sitemap_content (str): The content of the sitemap XML file
            
        Returns:
            List[str]: A list of URLs extracted from the sitemap
        """
        urls = []
        root = ET.fromstring(sitemap_content)
        
        # Define the namespace used in sitemap XML
        namespace = {'sitemap': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        # Find all <url> elements in the sitemap
        for url_element in root.findall('sitemap:url', namespace):
            loc_element = url_element.find('sitemap:loc', namespace)
            if loc_element is not None:
                urls.append(loc_element.text)
        
        return urls
    
    def get_urls(self) -> List[str]:
        """
        Get all URLs from the sitemap.
        
        Returns:
            List[str]: A list of URLs extracted from the sitemap
        """
        if not self.urls:
            sitemap_content = self.fetch_sitemap()
            self.urls = self.parse_sitemap(sitemap_content)
        
        return self.urls


def main():
    """
    Main function to demonstrate sitemap processing.
    """
    sitemap_url = "https://physical-ai-humanoid-robotics-textb-mocha.vercel.app/sitemap.xml"
    
    print(f"Processing sitemap: {sitemap_url}")
    
    try:
        processor = SitemapProcessor(sitemap_url)
        urls = processor.get_urls()
        
        print(f"Found {len(urls)} URLs in the sitemap:")
        for i, url in enumerate(urls, 1):
            print(f"{i:3d}. {url}")
        
        return urls
    
    except requests.RequestException as e:
        print(f"Error fetching sitemap: {e}")
        return []
    except ET.ParseError as e:
        print(f"Error parsing sitemap XML: {e}")
        return []
    except Exception as e:
        print(f"Unexpected error: {e}")
        return []


if __name__ == "__main__":
    main()