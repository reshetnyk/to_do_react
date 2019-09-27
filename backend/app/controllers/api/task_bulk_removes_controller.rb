# frozen_string_literal: true

module Api
  class TaskBulkRemovesController < Api::ApiController
    def destroy
      Task.where(id: destroy_params[:tasks]).delete_all
      render json: {}
    end

    private

    def destroy_params
      params.permit(tasks: [])
    end
  end
end
