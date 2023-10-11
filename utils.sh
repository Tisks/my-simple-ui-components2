#!/bin/bash

# Function to extract version bump from text
extract_version_bump() {
  local text="$1"

  if [[ "$text" == *"[X]"* && "$text" == *"Patch"* ]]; then
    echo "Patch"
  elif [[ "$text" == *"[X]"* && "$text" == *"Minor"* ]]; then
    echo "Minor"
  elif [[ "$text" == *"[X]"* && "$text" == *"Major"* ]]; then
    echo "Major"
  else
    echo "Unknown"
  fi
}

# Function to determine NEW_VERSION
determine_new_version() {
  local VERSION_BUMP="$1"
  local CURRENT_VERSION="$2"

  local NEW_VERSION="Unknown"

  IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
  local MAJOR="${VERSION_PARTS[0]}"
  local MINOR="${VERSION_PARTS[1]}"
  local PATCH="${VERSION_PARTS[2]}"

  if [[ "$VERSION_BUMP" == "Patch" ]]; then
    NEW_PATCH=$((PATCH + 1))
    NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"
  elif [[ "$VERSION_BUMP" == "Minor" ]]; then
    NEW_MINOR=$((MINOR + 1))
    NEW_VERSION="$MAJOR.$NEW_MINOR.0"
  elif [[ "$VERSION_BUMP" == "Major" ]]; then
    NEW_MAJOR=$((MAJOR + 1))
    NEW_VERSION="$NEW_MAJOR.0.0"
  fi

  echo "$NEW_VERSION"
}

# Function to get TAG_VERSION from a JSON file
get_tag_version() {
  local JSON_FILE="$1"

  local TAG_VERSION=$(node -e "const fs = require('fs'); const packageJson = JSON.parse(fs.readFileSync('$JSON_FILE')); console.log(packageJson.version);")

  echo "$TAG_VERSION"
}

# Function to update the version in a JSON file
update_version() {
  local JSON_FILE="$1"
  local NEW_VERSION="$2"

  node -e "const fs = require('fs'); const packageJson = JSON.parse(fs.readFileSync('$JSON_FILE')); packageJson.version = '$NEW_VERSION'; fs.writeFileSync('$JSON_FILE', JSON.stringify(packageJson, null, 2));"
}
