import Water from '../models/Water';

 export const addWaterDosage = async ( req, res) => {
  const { userId, amount } = req.body;

  try {
    const newWater = new Water({
      user: userId,
      amount,
    });

    await newWater.save();
    res.status(201).json({ message: 'Dawka wypitej wody dodana pomyślnie!' });
  } catch (err) {
    res.status(500).json({ message: 'Wystąpił błąd. Spróbuj ponownie.' });
  }
}

// Pobieranie wszystkich dawek wypitej wody danego użytkownika w danym dniu
router.get('/all/:userId/:date', async (req, res) => {
  const { userId, date } = req.params;

  try {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const waterData = await Water.find({
      user: userId,
      date: { $gte: start, $lte: end },
    });

    const totalAmount = waterData.reduce((total, item) => total + item.amount, 0);

    res.status(200).json({ totalAmount, waterData });
  } catch (err) {
    res.status(500).json({ message: 'Wystąpił błąd. Spróbuj ponownie.' });
  }
});

