class Api::TasksController < Api::ApiController
  def index
    tasks = Task.all
    render :json => { tasks: tasks }
  end

  def create
    task = Task.new(create_params)

    if task.save
      render json: { title: task.title }
    else
      render json: { errors: task.errors }, status: 400
    end
  end

  private

  def create_params
    params.permit(:title)
  end
end
