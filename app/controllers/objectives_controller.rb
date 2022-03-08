class ObjectivesController < ApplicationController
  before_action :set_objectives
  before_action :set_objective, only: [:update, :destroy]

  def index
    check_weight_consistency_error
  end

  def create
    @objective = Objective.new(objective_params)
    if @objective.save
      check_weight_consistency_error
      render :show
    else
      render json: { errors: @objective.errors.full_messages }
    end
  end

  def update
    @objective = Objective.find(params[:id])
    if @objective.update(objective_params)
      check_weight_consistency_error
      render :show
    else
      render json: { errors: @objective.errors.full_messages }
    end
  end

  def destroy
    @objective = Objective.find(params[:id])
    if @objective.destroy
      set_objectives
      check_weight_consistency_error
      render json: {
        id: params[:id],
        weight_consistency_error: @weight_consistency_error
      }
    else
      render json: { errors: @objective.errors.full_messages }
    end
  end

  private

  def objective_params
    params.require(:objective).permit(:title, :weight)
  end

  def set_objective
    @objective = Objective.find(params[:id])
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
