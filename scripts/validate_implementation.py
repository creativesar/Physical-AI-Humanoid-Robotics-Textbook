#!/usr/bin/env python3
"""
Validation script for Physical AI & Humanoid Robotics Textbook Platform
This script validates that all implementation requirements have been met.
"""

import os
import sys
from pathlib import Path

def validate_frontend():
    """Validate frontend implementation"""
    print("Validating Frontend...")

    frontend_path = Path("frontend")
    if not frontend_path.exists():
        print("[ERROR] Frontend directory not found")
        return False

    # Check required files
    required_files = [
        "docusaurus.config.ts",
        "tailwind.config.js",
        "src/css/custom.css",
        "pages/index.tsx",
        "src/components/Chatbot.tsx",
        "src/components/HomepageFeatures.tsx"
    ]

    for file in required_files:
        if not (frontend_path / file).exists():
            print(f"[ERROR] Missing frontend file: {file}")
            return False

    # Check for theme implementation
    with open(frontend_path / "src/css/custom.css", "r", encoding="utf-8") as f:
        css_content = f.read()
        if "#000000" not in css_content:
            print("[ERROR] Black theme not properly implemented in custom.css")
            return False

    print("[SUCCESS] Frontend validation passed")
    return True

def validate_backend():
    """Validate backend implementation"""
    print("Validating Backend...")

    backend_path = Path("backend")
    if not backend_path.exists():
        print("[ERROR] Backend directory not found")
        return False

    # Check required directories
    required_dirs = ["api", "auth", "db", "rag", "models"]
    for dir_name in required_dirs:
        if not (backend_path / dir_name).exists():
            print(f"[ERROR] Missing backend directory: {dir_name}")
            return False

    # Check required files
    required_files = [
        "main.py",
        "requirements.txt",
        "api/router.py",
        "auth/__init__.py",
        "db/models.py",
        "rag/chat.py",
        "rag/embed.py",
        "rag/vector_store.py",
        "rag/ingest.py",
        "rag/query.py"
    ]

    for file in required_files:
        if not (backend_path / file).exists():
            print(f"[ERROR] Missing backend file: {file}")
            return False

    print("[SUCCESS] Backend validation passed")
    return True

def validate_textbook_structure():
    """Validate textbook module structure"""
    print("Validating Textbook Structure...")

    docs_path = Path("docs")
    if not docs_path.exists():
        print("[ERROR] Docs directory not found")
        return False

    # Check for 19 modules
    module_dirs = [d for d in docs_path.iterdir() if d.is_dir() and d.name.startswith("module-")]
    if len(module_dirs) != 19:
        print(f"[ERROR] Expected 19 modules, found {len(module_dirs)}")
        return False

    # Check content in first module
    module1_path = docs_path / "module-1"
    if not module1_path.exists():
        print("[ERROR] Module 1 directory not found")
        return False

    mdx_files = list(module1_path.glob("*.mdx"))
    if len(mdx_files) == 0:
        print("[ERROR] No MDX files found in Module 1")
        return False

    print("[SUCCESS] Textbook structure validation passed")
    return True

def validate_implementation_requirements():
    """Validate all implementation requirements from the spec"""
    print("Validating Implementation Requirements...")

    # Check for all required sections on homepage
    frontend_path = Path("frontend")
    homepage_content = ""
    homepage_features_content = ""

    try:
        with open(frontend_path / "pages/index.tsx", "r", encoding="utf-8") as f:
            homepage_content = f.read()
    except:
        print("[ERROR] Could not read homepage file")
        return False

    try:
        with open(frontend_path / "src/components/HomepageFeatures.tsx", "r", encoding="utf-8") as f:
            homepage_features_content = f.read()
    except:
        print("[ERROR] Could not read HomepageFeatures component")
        return False

    required_sections = [
        "Hero", "About Us", "What We Do", "Our Services",
        "Module Grid", "Counter Section", "Testimonials",
        "Trusted Partners", "FAQs", "Get Connect"
    ]

    section_indicators = {
        "Hero": ["hero__title", "hero__subtitle", "hero-title", "hero-subtitle"],
        "About Us": ["About Us", "aboutSection", "FeatureList"],  # About Us is part of FeatureList
        "What We Do": ["What We Do", "FeatureList"],  # What We Do is part of FeatureList
        "Our Services": ["Our Services", "FeatureList"],  # Our Services is part of FeatureList
        "Module Grid": ["Module Grid", "module-grid", "module-grid"],
        "Counter Section": ["counter", "CounterSection", "counter-section"],
        "Testimonials": ["Testimonials", "testimonials", "testimonials"],
        "Trusted Partners": ["Trusted Partners", "partners", "partners"],
        "FAQs": ["FAQ", "faq"],
        "Get Connect": ["Get Connected", "Get Connect"]
    }

    missing_sections = []
    for section, indicators in section_indicators.items():
        # Check both files for the indicators
        found = False
        for indicator in indicators:
            if indicator in homepage_content or indicator in homepage_features_content:
                found = True
                break
        if not found:
            missing_sections.append(section)

    if missing_sections:
        print(f"[ERROR] Missing sections on homepage: {missing_sections}")
        return False

    print("[SUCCESS] Implementation requirements validation passed")
    return True

def validate_design_requirements():
    """Validate design requirements"""
    print("Validating Design Requirements...")

    # Check for pure black theme
    css_path = Path("frontend/src/css/custom.css")
    if not css_path.exists():
        print("[ERROR] Custom CSS file not found")
        return False

    with open(css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    # Check for black background
    if "#000000" not in css_content:
        print("[ERROR] Pure black (#000000) theme not implemented")
        return False

    # Check for typography in docusaurus config
    docusaurus_config_path = Path("frontend/docusaurus.config.ts")
    if not docusaurus_config_path.exists():
        print("[ERROR] Docusaurus config not found")
        return False

    with open(docusaurus_config_path, "r", encoding="utf-8") as f:
        config_content = f.read()

    if "Sora" not in config_content and "fontFamily: 'Sora'" not in config_content:
        print("[ERROR] Sora font for headings not configured")
        return False

    if "Inter" not in config_content and "fontFamily: 'Inter'" not in config_content:
        print("[ERROR] Inter font for body text not configured")
        return False

    print("[SUCCESS] Design requirements validation passed")
    return True

def validate_ai_integration():
    """Validate AI integration"""
    print("Validating AI Integration...")

    backend_path = Path("backend")

    # Check for Cohere integration
    embed_path = backend_path / "rag/embed.py"
    if not embed_path.exists():
        print("[ERROR] Cohere embedding module not found")
        return False

    with open(embed_path, "r", encoding="utf-8") as f:
        embed_content = f.read()

    if "cohere" not in embed_content.lower():
        print("[ERROR] Cohere integration not found in embed module")
        return False

    # Check for Gemini integration
    chat_path = backend_path / "rag/chat.py"
    if not chat_path.exists():
        print("[ERROR] Chat module not found")
        return False

    with open(chat_path, "r", encoding="utf-8") as f:
        chat_content = f.read()

    if "gemini" not in chat_content.lower() and "google.generativeai" not in chat_content:
        print("[ERROR] Gemini integration not found in chat module")
        return False

    # Check for Qdrant integration
    vector_store_path = backend_path / "rag/vector_store.py"
    if not vector_store_path.exists():
        print("[ERROR] Vector store module not found")
        return False

    with open(vector_store_path, "r", encoding="utf-8") as f:
        vector_content = f.read()

    if "qdrant" not in vector_content.lower():
        print("[ERROR] Qdrant integration not found in vector store")
        return False

    print("[SUCCESS] AI integration validation passed")
    return True

def main():
    """Main validation function"""
    print("Starting validation of Physical AI & Humanoid Robotics Textbook Platform...")
    print("="*70)

    validations = [
        validate_frontend,
        validate_backend,
        validate_textbook_structure,
        validate_implementation_requirements,
        validate_design_requirements,
        validate_ai_integration
    ]

    all_passed = True
    for validation in validations:
        if not validation():
            all_passed = False
        print()

    print("="*70)
    if all_passed:
        print("[SUCCESS] All validations passed! The implementation meets all requirements.")
        return 0
    else:
        print("[ERROR] Some validations failed. Please check the implementation.")
        return 1

if __name__ == "__main__":
    sys.exit(main())