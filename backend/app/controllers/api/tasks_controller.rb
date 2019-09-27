# frozen_string_literal: true

module Api
  class TasksController < Api::ApiController
    def index
      tasks = Task.all
      render json: { tasks: tasks }
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
      Task.delete(params[:id])
    rescue StandardError => e
      render json: { errors: e }, status: 400
    else
      render json: { task: params[:task] }
    end

    private

    def create_params
      params.permit(:title)
    end
  end
end
