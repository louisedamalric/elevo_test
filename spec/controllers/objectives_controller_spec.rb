require 'rails_helper'

describe ObjectivesController do
  render_views

  describe '#index' do
    subject { get :index, format: :json }

    let!(:objectives) do
      [60, 10].map do |weight|
        create(:objective, weight: weight)
      end
    end

    let(:expected_response) do
      {
        data: objectives.map { |o| { id: o.id, title: o.title, weight: o.weight }},
        weight_consistency_error: "Heads up! Your objective weights are invalid.
        They should all be defined and the sum should be 100%.
        Actual sum: 70%"
      }.to_json
    end

    it 'checks weight consitency' do
      subject
      expect(JSON.parse(response.body)).to eq JSON.parse(expected_response)
    end
  end

  describe '#create' do
    subject { post :create, format: :json, params: params }

    let(:params) do
      {
        objective: {
          title: "To do",
          weight: 20
        }
      }
    end

    it 'updates objective' do
      expect { subject }.to change(Objective, :count).by(1)
    end
  end

  describe '#update' do
    subject { put :update, format: :json, params: params }

    let(:objective) { create(:objective) }

    let(:params) do
      {
        id: objective.id,
        objective: {
          id: objective.id,
          title: "To do",
          weight: 30
        }
      }
    end

    it 'updates objective' do
      expect { subject }.to change { objective.reload.title }.from('Do something').to('To do')
        .and change { objective.weight }.from(20).to(30)
    end
  end

  describe '#destroy' do
    subject { delete :destroy, format: :json, params: params }

    let!(:objective) { create(:objective) }

    let(:params) do
      {
        id: objective.id
      }
    end

    it 'destroys objective' do
      expect { subject }.to change(Objective, :count).from(1).to(0)
    end
  end
end
