require 'rails_helper'

RSpec.describe Task, type: :model do
  context 'validation' do
    context ':title' do
      it 'should not be nil' do
        expect(build(:task, title: nil).valid?).to be false
      end
      it 'should not be blank' do
        expect(build(:task, title: '').valid?).to be false
      end
      it 'should contain 3 symbols at least' do
        expect(build(:task, title: 'ss').valid?).to be false
      end
    end
    context ':position' do
      it 'should be set after creation' do
        expect(create(:task).position).not_to be_nil
      end
      it 'should be Numeric' do
        expect(create(:task).position).to be_kind_of Numeric
      end
      it 'should be more than 0' do
        expect(create(:task).position).to be > 0
      end
      it 'should be row of natural numbers sorted in creation order in same user' do
        u1 = create(:user)
        u2 = create(:user)
        create(:task, user: u1)
        create(:task, user: u2)
        create(:task, user: u2)
        create(:task, user: u1)
        create(:task, user: u2)
        create(:task, user: u1)
        expect(u1.tasks.pluck(:position).join(',')).to eq '1,2,3'
      end
      # it 'should be row of natural numbers sorted in creation order in same user afted' do
      #   u1 = create(:user)
      #   u2 = create(:user)
      #   create(:task, user: u1)
      #   create(:task, user: u2)
      #   create(:task, user: u2)
      #   create(:task, user: u1)
      #   create(:task, user: u2)
      #   create(:task, user: u1)
      # end
    end
  end
end
