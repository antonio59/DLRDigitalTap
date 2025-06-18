-- Insert initial comments data
INSERT INTO comments (user_id, name, comment, created_at)
VALUES
  ('system', 'Sarah Johnson', 'This would make my daily commute so much easier! I often struggle to reach the tap points during rush hour.', NOW() - INTERVAL '5 days'),
  ('system', 'David Chen', 'Great idea! I''ve missed trains before because of queues at the tap points. This would solve that problem.', NOW() - INTERVAL '6 days'),
  ('system', 'Priya Patel', 'As someone with mobility issues, this would be a game-changer for me. Physical tap points can be hard to reach sometimes.', NOW() - INTERVAL '6 days 12 hours'),
  ('system', 'James Wilson', 'I travel with my kids and luggage often. Digital tapping would make our journeys much less stressful!', NOW() - INTERVAL '7 days'),
  ('system', 'Emma Thompson', 'I''ve been charged maximum fare a few times when I couldn''t reach the tap point to tap out. This would solve that problem!', NOW() - INTERVAL '8 days'),
  ('system', 'Michael Rodriguez', 'The DLR is already driverless, so digital tapping seems like the natural next step in modernizing the system.', NOW() - INTERVAL '9 days'),
  ('system', 'Olivia Baker', 'I hope TfL takes this seriously. It would improve the passenger experience significantly.', NOW() - INTERVAL '10 days')
ON CONFLICT DO NOTHING;

-- Insert initial votes (1458 votes)
DO $$
BEGIN
  FOR i IN 1..1458 LOOP
    INSERT INTO votes (user_id, created_at)
    VALUES ('system_' || i, NOW() - (random() * INTERVAL '30 days'))
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;
