# frozen_string_literal: true

module Api
  class TasksController < ApiController
    def index
      tasks = current_user.tasks.order(:position)
      render json: { tasks: tasks }
    end

    def create
      task = current_user.tasks.build(create_params)
      if task.save
        render json: { id: task.id, title: task.title, position: task.position }
      else
        render json: { errors: task.errors }, status: 400
      end
    end

    def destroy
      current_user.tasks.find(params[:id]).destroy
      render json: {}
    end

    def update
      current_user.tasks.find(params[:id]).update(update_params)
      render json: {}
    end

    private

    def create_params
      params.permit(:title)
    end

    def update_params
      params.permit(:title, :status)
    end
  end
end
