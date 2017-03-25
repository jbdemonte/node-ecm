{
  "targets": [
    {
      "target_name": "addon",
      "sources": ["src/ecm.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}