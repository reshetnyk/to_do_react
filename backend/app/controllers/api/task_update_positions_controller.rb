# frozen_string_literal: true

module Api
  class TaskUpdatePositionsController < ApiController
    def update
      task = current_user.tasks.find(update_params[:id])
      task.insert_at(update_params[:position])
      render json: {}
    end

    private

    def update_params
      params.permit(:id, :position)
    end
  end
end
