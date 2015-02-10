require 'redmine'
require 'issue_subject_generator_issues_hook'
Redmine::Plugin.register :redmine_issue_subject_generator do
  name 'Redmine Issue Subject Generator plugin'
  author 'Author name'
  description 'This is a plugin for Redmine'
  version '0.0.1'
  url 'http://example.com/path/to/plugin'
  author_url 'http://example.com/about'
end
