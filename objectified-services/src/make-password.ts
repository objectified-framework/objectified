import * as bcrypt from 'bcrypt';

(async () => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(process.argv[2], salt);

  console.log(`${process.argv[2]} = '${hashPassword}'`);
})();
