# frozen_string_literal: true

module Api
  class TaskBulkRemovesController < Api::ApiController
    before_action :authentication

    def destroy
      # Task.where(user_id: current_user.id, id: destroy_params[:tasks])
      current_user.tasks.where(id: destroy_params[:tasks]).destroy_all
      render json: {}
    end

    private

    def destroy_params
      params.permit(tasks: [])
    end
  end
end
