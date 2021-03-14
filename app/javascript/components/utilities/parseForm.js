export default function parseForm(formData) {

  const formdataParsed = {};

  [...formData].forEach(formitem => {
    formdataParsed[formitem[0]] = formitem[1]
  });

  return formdataParsed;

}