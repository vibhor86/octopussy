class ProjectController < ApplicationController
  def index
    github = Github.new(oauth_token: current_user.oauth_token)
    @repos = github.repos.all
  
    @issues = github.issues.all 
    
    @milestones = github.issues.milestones.all
    raise @milestones.inspect
 end

  def show
  end
end
