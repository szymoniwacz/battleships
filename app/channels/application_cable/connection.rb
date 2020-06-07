module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_player

    def connect
      self.current_player = find_current_player
    end

    private

    def find_current_player
      if current_player = Player.find_by(id: cookies.encrypted[:player_id])
        current_player
      else
        reject_unauthorized_connection
      end
    end
  end
end
