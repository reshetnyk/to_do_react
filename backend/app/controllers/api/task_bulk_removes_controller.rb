# frozen_string_literal: true

module Api
  class TaskBulkRemovesController < ApiController
    def destroy
      current_user.tasks.where(id: destroy_params[:tasks]).destroy_all
      render json: {}
    end

    private

    def destroy_params
      params.permit(tasks: [])
    end
  end
end
