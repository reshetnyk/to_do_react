class Api::TaskBulkRemovesController < Api::ApiController
  def destroy
    puts params.inspect
    begin
      Task.delete(params[:tasks])
    rescue => error
      render json: { errors: error }, status: 400
    else
      render json: { tasks: params[:tasks] }
    end
  end

  private
  def destroy_params
    params.permit(:tasks)
  end
end