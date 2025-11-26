USE `Group 6`;

-- Update passwords with proper bcrypt hashes
UPDATE users SET password_hash = '$2b$12$ADKC8krRWX7UduxJxGtoyO1tJV9.BES5.zyCI9hSUGx8GfBaKKQvW' WHERE username = 'mohamed_muse';
UPDATE users SET password_hash = '$2b$12$.EGiahqNRKGlRd.SYEVx8OsmZvL5srdJlWbs.QkHVd4vz5vVTr0Zy' WHERE username = 'inesh_rajwade';
UPDATE users SET password_hash = '$2b$12$PaFizz8rt4BjGetBFRDHUeW3vx6f8mUg/drq80k99wrwfzcFqAM1a' WHERE username = 'sean_staley';
