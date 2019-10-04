# frozen_string_literal: true

module Api
  class TaskUpdateCompletesController < Api::ApiController
    def update
      Task.where(id: update_params[:ids])
          .update_all(status: update_params[:status])
      render json: {}
    end

    private

    def update_params
      params.permit(:status, ids: [])
    end
  end
end
