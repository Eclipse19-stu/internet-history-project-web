//validator.js
// Whats excpected from each pages JSON data
export const PAGE_REQUIREMENTS = {
  HOME: {
    required: ['logo', 'navLinks', 'heroImage', 'bodyContent', 'footerLinks'],
    nested: {
      logo: { required: ['url', 'altText'] }, 
      heroImage: { required: ['url', 'altText'] }, 
      bodyContent: {
        array: true, 
        itemPageLayout: { required: ['image', 'altText', 'title', 'text'] }
      }
    }
  },
  ISPS: {
    required: ['logo', 'navLinks', 'heroImage', 'isps', 'footerLinks'],
    nested: {
      logo: { required: ['url', 'altText'] },
      heroImage: { required: ['url', 'altText'] },
      isps: {
        array: true,
        itemPageLayout: { 
          required: ['name', 'yearFounded', 'logo', 'description'] 
        }
      }
    }
  },
  FUTURE: {
    required: ['logo', 'navLinks', 'heroImage', 'futureTrends', 'footerLinks'],
    nested: {
      logo: { required: ['url', 'altText'] },
      heroImage: { required: ['url', 'altText'] },
      futureTrends: {
        array: true,
        itemPageLayout: { required: ['title', 'description', 'image', 'altText'] }
      }
    }
  },
  REFERENCES: {
    required: ['logo', 'navLinks', 'references', 'footerLinks'],
    nested: {
      logo: { required: ['url', 'altText'] },
      references: {
        array: true
      }
    }
  }
};

// checker for our page data
export function validateData(data, PageLayout) {
  const errors = [];

  // first check if required fields are present
  PageLayout.required.forEach(field => {
    if (!data[field]) {
      console.log(`Oops: We're missing ${field} entirely`);
      errors.push(`Missing required field: ${field}`);
    }
  });

  // look inside nested objects
  if (PageLayout.nested) {
    Object.entries(PageLayout.nested).forEach(([field, rules]) => {
      if (rules.array) {
        // check if its actually a list
        if (!Array.isArray(data[field])) {
          console.log(`Wait, ${field} should be a list but isnt`);
          errors.push(`${field} must be an array`);
        }
      } else if (data[field]) {
        // check inner fields
        rules.required?.forEach(requiredField => {
          if (!data[field][requiredField]) {
            console.log(`Found ${field} but missing ${requiredField} inside it`);
            errors.push(`${field} missing ${requiredField}`);
          }
        });
      }
    });
  }

  // return all the errors
  return errors;
}