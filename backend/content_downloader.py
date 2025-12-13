#!/usr/bin/env python3
"""
Content Downloader for Physical AI & Humanoid Robotics Textbook
This script downloads content from URLs and processes it for RAG ingestion.
"""

import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Any
from urllib.parse import urljoin, urlparse
import time


class ContentDownloader:
    """
    A class to download and process content from URLs for RAG ingestion.
    """
    
    def __init__(self, urls: List[str]):
        """
        Initialize the ContentDownloader with a list of URLs.
        
        Args:
            urls (List[str]): A list of URLs to download content from
        """
        self.urls = urls
        self.content = []
        
        # Set headers to mimic a real browser request
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    
    def fetch_content(self, url: str) -> str:
        """
        Fetch content from a URL.
        
        Args:
            url (str): The URL to fetch content from
            
        Returns:
            str: The content of the page
        """
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.text
    
    def extract_text_from_html(self, html_content: str, url: str) -> Dict[str, Any]:
        """
        Extract meaningful text content from HTML.
        
        Args:
            html_content (str): The HTML content to extract text from
            url (str): The URL the content was fetched from
            
        Returns:
            Dict[str, Any]: A dictionary containing the extracted content and metadata
        """
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()
        
        # Extract title
        title_tag = soup.find('title')
        title = title_tag.get_text().strip() if title_tag else urlparse(url).path.split('/')[-1]
        
        # Extract main content - focus on content-rich elements
        content_selectors = [
            'main', '.main-content', '.content', 
            'article', '.post-content', '.entry-content',
            '.markdown-section', '.doc-content', 
            '.text-content', '.page-content'
        ]
        
        main_content = None
        for selector in content_selectors:
            main_content = soup.select_one(selector)
            if main_content:
                break
        
        # If no main content area found, use body
        if not main_content:
            main_content = soup.find('body')
        
        if main_content:
            # Extract text from the main content area
            text = main_content.get_text(separator=' ', strip=True)
        else:
            # Fallback to the whole document
            text = soup.get_text(separator=' ', strip=True)
        
        # Clean up text by removing extra whitespace
        import re
        text = re.sub(r'\s+', ' ', text).strip()
        
        return {
            'url': url,
            'title': title,
            'content': text,
            'content_type': 'html'
        }
    
    def download_all_content(self) -> List[Dict[str, Any]]:
        """
        Download and process content from all URLs.
        
        Returns:
            List[Dict[str, Any]]: A list of dictionaries containing content and metadata
        """
        all_content = []
        
        for i, url in enumerate(self.urls, 1):
            print(f"Downloading content {i}/{len(self.urls)}: {url}")
            
            try:
                html_content = self.fetch_content(url)
                content_data = self.extract_text_from_html(html_content, url)
                all_content.append(content_data)
                
                # Be respectful with requests - add a small delay
                time.sleep(0.5)
                
            except requests.RequestException as e:
                print(f"Error downloading {url}: {e}")
                continue
            except Exception as e:
                print(f"Error processing {url}: {e}")
                continue
        
        return all_content


def main():
    """
    Main function to demonstrate content downloading and processing.
    """
    sitemap_url = "https://physical-ai-humanoid-robotics-textb-mocha.vercel.app/sitemap.xml"

    # Import sitemap processor to get actual URLs
    from sitemap_processor import SitemapProcessor

    print(f"Processing sitemap: {sitemap_url}")
    processor = SitemapProcessor(sitemap_url)
    urls = processor.get_urls()

    if not urls:
        print("No URLs found in sitemap, using original sitemap URL as fallback")
        urls = [sitemap_url]

    print(f"Found {len(urls)} URLs to process")
    print("Downloading and processing content...")

    downloader = ContentDownloader(urls)
    content = downloader.download_all_content()

    print(f"Downloaded content from {len(content)} URLs:")
    for item in content:
        print(f"- URL: {item['url']}")
        print(f"  Title: {item['title']}")
        print(f"  Content length: {len(item['content'])} characters")
        print()

    return content


if __name__ == "__main__":
    main()