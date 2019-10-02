# frozen_string_literal: true

module Api
  class TaskUpdatePositionsController < Api::ApiController
    def update
      task = Task.find(update_params[:id])
      task.insert_at(update_params[:position])
      render json: {}
    end

    private

    def update_params
      params.permit(:id, :position)
    end
  end
end
