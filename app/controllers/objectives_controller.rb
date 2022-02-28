class ObjectivesController < ApplicationController
  def index
    @objectives = Objective.all
  end
end
