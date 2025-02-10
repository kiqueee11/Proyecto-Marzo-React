// styles/Style.tsx
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B8B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#FF4466',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: '#FF8899',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
  profileButton: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileAge: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  iconButton: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  meetButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  meetButtonText: {
    color: '#FF4466',
    fontSize: 20,
    fontWeight: 'bold',
  },
  editProfileContainer: {
    flex: 1,
    backgroundColor: '#FF6B8B',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  photoBox: {
    width: '33%',
    aspectRatio: 1,
    padding: 5,
  },
  cameraIcon: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFA0B4',
    borderRadius: 10,
  },
  personalInfo: {
    padding: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  infoInput: {
    backgroundColor: '#FFA0B4',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  descriptionInput: {
    backgroundColor: '#FFA0B4',
    margin: 15,
    padding: 10,
    borderRadius: 8,
    height: 100,
  },
  socialLinks: {
    padding: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: '#FF6B8B',
  },
  settingsSection: {
    padding: 15,
  },
  settingsHeader: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFA0B4',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  settingValue: {
    color: '#666',
  },
  preferencesToggle: {
    flexDirection: 'row',
    backgroundColor: '#FFA0B4',
    borderRadius: 8,
    marginVertical: 10,
    overflow: 'hidden',
  },
  preferenceButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activePreference: {
    backgroundColor: '#FF8899',
  },
  sessionButtons: {
    padding: 15,
  },
  logoutButton: {
    backgroundColor: '#FFA0B4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#FF4466',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#666',
  },
  deleteText: {
    color: 'white',
  },
  friendsContainer: {
    flex: 1,
    backgroundColor: '#FF6B8B',
  },
  friendItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFA0B4',
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  friendInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  friendName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendMessage: {
    color: '#FFA0B4',
  },
});

export default styles;