#!/usr/bin/env bash
set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
dist_dir="$repo_root/dist"
mmdoc_bin=${MMDOC_BIN:-"$repo_root/vendor/mmdoc"}

if [[ ! -x "$mmdoc_bin" ]]; then
  printf 'mmdoc binary is missing or not executable: %s\n' "$mmdoc_bin" >&2
  exit 1
fi

build_root=$(mktemp -d "${TMPDIR:-/tmp}/mecattaf-dev-build.XXXXXX")
trap 'rm -rf -- "$build_root"' EXIT

"$mmdoc_bin" mecattaf.dev "$repo_root/content" "$build_root"

# dist/ is generated output and is always replaced as a unit.
rm -rf -- "$dist_dir"
cp -R "$build_root/multi" "$dist_dir"
cp "$repo_root/static/palette.css" "$dist_dir/palette.css"
cp "$repo_root/static/site.css" "$dist_dir/site.css"
cp "$repo_root/static/_redirects" "$dist_dir/_redirects"

# Plain-text copies of each page, for pasting into or fetching by LLMs.
for md in "$repo_root"/content/*.md; do
  name=$(basename "$md" .md)
  case "$name" in toc|_template) continue ;; esac
  cp "$md" "$dist_dir/$name.txt"
done

while IFS= read -r -d '' page; do
  sed -i "/mmdoc[^']*\\.css/a\\    <link rel='stylesheet' href='palette.css'>" "$page"
  sed -i "/palette\\.css/a\\    <link rel='stylesheet' href='site.css'>" "$page"
done < <(find "$dist_dir" -type f -name index.html -print0)

printf 'mmdoc site -> %s\n' "$dist_dir"
