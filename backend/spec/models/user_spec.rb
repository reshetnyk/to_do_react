require 'rails_helper'

RSpec.describe User, type: :model do
  context 'methods' do
    context '#confirmed?' do
      it 'should return true when :confirmed_at contains datetime object' do
        expect(build(:user, confirmed_at: DateTime.now).confirmed?).to be true
      end
      it 'should return false when :confirmed_at is nil' do
        expect(build(:user, confirmed_at: nil).confirmed?).to be false
      end
    end

    context '#generate_password_token' do
      it 'should set :password_reset_token as string' do
        u = build(:user, password_reset_token: nil)
        u.generate_password_token
        expect(u.password_reset_token).to be_instance_of String
      end
    end

    context '#clear_password_token' do
      it 'should set :password_reset_token to nil' do
        u = build(:user, password_reset_token: 'password$token')
        u.clear_password_token
        expect(u.password_reset_token).to be_nil
      end
    end

    context '#activate' do
      it 'should set :confirmed_at not nil value after executing' do
        u = build(:user, confirmed_at: nil)
        u.activate
        expect(u.confirmed_at).not_to be_nil
      end
      it 'should set :confirm_token nil after executing' do
        u = build(:user, confirm_token: 'confirm_token')
        u.activate
        expect(u.confirm_token).to be_nil
      end
    end

    context 'callback #add_confirm_token' do
      it 'should be set :confirm_token after executing before_create :add_confirm_token' do
        expect(create(:user, confirm_token: nil).confirm_token).not_to be_nil
      end
    end
  end

  context 'validation' do
    context 'email' do
      it 'should not be nil' do
        expect(build(:user, email: nil).valid?).to be false
      end
      it 'should not be blank' do
        expect(build(:user, email: '').valid?).to be false
      end
      it 'should be unique' do
        create(:user, email: 'exa@mp.le')
        expect(build(:user, email: 'exa@mp.le').valid?).to be false
      end
      it 'should be invalid without @' do
        expect(build(:user, email: 'exam.ple').valid?).to be false
      end
      it 'should be invalid without \'.\'' do
        expect(build(:user, email: 'exam@ple').valid?).to be false
      end
      it 'should be invalid without \'.\' after \'@\'' do
        expect(build(:user, email: 'ex.am@ple').valid?).to be false
      end
      it 'should be valid' do
        expect(build(:user, email: 'exam@ple.ez').valid?).to be true
      end
    end
    context 'passwords' do
      it 'should not be created if password and password_confirmation different' do
        expect(build(:user, password: 'password', password_confirmation: 'smthelse').valid?).to be false
      end
      it 'should not be less than 6 symbols' do
        expect(build(:user, password: 'aaaaa', password_confirmation: 'aaaaa').valid?).to be false
      end
    end
    context 'confirm_token' do
      it 'should be set after creation' do
        expect(create(:user).confirm_token).not_to be_nil
      end
      it 'should be string' do
        expect(create(:user).confirm_token).to be_instance_of String
      end
      xit 'should be unique' do
        create(:user, confirm_token: 'token')
        expect(build(:user, confirm_token: 'token').valid?).to be false
      end
    end
  end
end
