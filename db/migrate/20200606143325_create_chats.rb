class CreateChats < ActiveRecord::Migration[6.0]
  def change
    create_table :chats do |t|
      t.string :game_id

      t.timestamps
    end
  end
end
