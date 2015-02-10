# To change this template, choose Tools | Templates
# and open the template in the editor.

class IssueSubjectGeneratorIssuesHook < Redmine::Hook::ViewListener
  include IssuesHelper
  
  def view_layouts_base_html_head(context = {})
    o = nil
    if (context[:controller].class.name == 'IssuesController' and 
        (context[:controller].action_name == 'new' or
         context[:controller].action_name == 'create')) 
      o = javascript_include_tag('issue_subject_generator', :plugin => 'redmine_issue_subject_generator')
    end      
    return o
  end
end
