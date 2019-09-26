class Api::TasksController < Api::ApiController
  def index
    tasks = Task.all
    render :json => { tasks: tasks }
  end

  def create
    task = Task.new(create_params)

    if task.save
      render json: { id: task.id, title: task.title }
    else
      render json: { errors: task.errors }, status: 400
    end
  end

  def destroy
    begin
      Task.delete(params[:id])
    rescue => error
      render json: { errors: error }, status: 400
    else
      render json: { task: params[:task] }
    end
  end

  private
  def create_params
    params.permit(:title)
  end
end
