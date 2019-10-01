module Api
  class TaskUpdatePositionsController < Api::ApiController
    def update
      u_params = update_params
      task = Task.find(u_params[:id])
      task.insert_at(u_params[:position])
      render json: {}
    end

    private

    def update_params
      params.permit(:id, :position)
    end
  end
end
