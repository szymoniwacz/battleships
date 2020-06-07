require 'rails_helper'

feature 'Gameplay', js: true do
  context 'new game' do
    before do
      visit new_game_path
      @game_url = current_url
    end

    scenario 'when game starts' do
      expect(page).to have_content "Waiting for opponent"
    end

    scenario 'when opponent connects' do
      @first_player_page = page
      expect(@first_player_page).to have_content "Waiting for opponent"

      # Simulate new player by changing browser
      Capybara.current_driver = :selenium
      visit @game_url
      @second_player_page = page

      expect(@second_player_page).to have_content "Opponent's move"
      expect(@first_player_page).to have_content "Your move"
    end
  end
end
