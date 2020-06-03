class Ship < ApplicationRecord
  def sunk?
    size == hits
  end
end
