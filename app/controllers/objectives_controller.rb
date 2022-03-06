class ObjectivesController < ApplicationController
  before_action :set_objectives

  def index
    check_weight_consistency_error
  end

  def create
    @objective = Objective.new(objective_params)
    if @objective.save
      check_weight_consistency_error
      render :show
    else
      render json: { success: false, errors: @objective.errors.full_messages }
    end
  end

  def update
    @objective = Objective.find(params[:id])
    if @objective.update(objective_params)
      check_weight_consistency_error
      render :show
    else
      render json: { success: false, errors: @objective.errors.full_messages }
    end
  end

  private

  def objective_params
    params.require(:objective).permit(:title, :weight)
  end

  def set_objectives
    @objectives = Objective.all
  end

  def check_weight_consistency_error
    weight_consistency_form = WeightConsistencyForm.new(@objectives.pluck(:weight))
    weight_consistency_form.valid?
    @weight_consistency_error = weight_consistency_form.errors.full_messages.first
  end
end
