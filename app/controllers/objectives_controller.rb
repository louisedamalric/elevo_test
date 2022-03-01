class ObjectivesController < ApplicationController
  def index
    @objectives = Objective.all
  end

  def create
    @objective = Objective.new(objective_params)
    if @objective.save
      render :show
    else
      render json: { success: false, errors: @objective.errors.full_messages }
    end
  end

  private

  def objective_params
    params.require(:objective).permit(:title, :weight)
  end
end
