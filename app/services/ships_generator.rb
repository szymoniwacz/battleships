class ShipsGenerator
  def initialize(player:)
    @player = player
    @sizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
    @possible_directions = [[0, :+], [0, :-], [1, :+], [1, :-]].shuffle
    @ships = []
    @invalid_fields = []
  end

  def place_ships
    ships_coordinates = generate_coordinates

    if ships_coordinates.size == @sizes.size
      ships_coordinates.each do
        @ships << @player.ships.create!(coordinates: _1, size: _1.size)
      end
    end

    @ships
  end

  def generate_coordinates
    coordinates = []
    @sizes.each do |size|
      coords = draw_coordinates(size)
      coordinates << coords
      add_coordinates_to_invalid_fields(coords)
    end
    coordinates
  end

  def draw_coordinates(size)
    cells = [find_first_cell]
    @possible_directions.each do |direction|
      (size - 1).times do
        next_cell = find_next_cell_to(cells.last, direction)
        break if next_cell.nil?
        cells << next_cell
      end

      cells = [cells[0]] if cells.size != size # Reset to first cell if incorrect length.

      break if cells.size == size # Break loop if correct length generated.
    end
    # Redraw coordinates from different first cell if couldn't generate correct ones.
    cells = draw_coordinates(size) if cells.size != size
    cells
  end

  def find_first_cell(checked: [])
    cell = random_not_used_coords(checked)
    checked << cell
    valid_coordinates?(cell) ? cell : find_first_cell(checked: checked)
  end

  def random_not_used_coords(checked)
    cell = [rand(0..9), rand(0..9)]
    checked.include?(cell) ? random_not_used_coords(checked) : cell
  end

  # Finds cell next to previous one in specific direction.
  def find_next_cell_to(cell, direction)
    new_cell = cell.dup
    new_cell[direction[0]] = new_cell[direction[0]].send(direction[1], 1)
    valid_coordinates?(new_cell) ? new_cell : nil
  end

  # Checks if cell is not outside of the board or too close to another existing ships.
  def valid_coordinates?(cell)
    return false if ([10, -1] & cell).any?
    !@invalid_fields.include?(cell)
  end

  def add_coordinates_to_invalid_fields(coordinates)
    coordinates.each do |x, y|
      [x - 1, x, x + 1].each do |xx|
        [y - 1, y, y + 1].each do |yy|
          @invalid_fields << [xx, yy] unless ([10, -1] & [xx, yy]).any?
        end
      end
    end
    @invalid_fields.uniq!
  end
end
